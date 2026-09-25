/**
 * API Route: /api/v1/voyage8/synthesize
 * Executes the 16-Stage Canonical Journey Runtime to generate a custom itinerary
 */

import { NextResponse } from 'next/server';
import { ItinerarySynthesizer, TravelIntentRequest } from '@/lib/voyage8/itinerary-synthesizer';
import { DestinationIntelligenceService } from '@/lib/voyage8/destination-intelligence';

export async function POST(request: Request) {
  try {
    const body: TravelIntentRequest = await request.json();

    if (!body.destination) {
      return NextResponse.json(
        { success: false, error: 'Destination is mandatory for itinerary synthesis.' },
        { status: 400 }
      );
    }

    const synthesizer = ItinerarySynthesizer.getInstance();
    const destinationIntel = DestinationIntelligenceService.getInstance();

    // 1. Synthesize multi-day itinerary with conflict-free pacing
    const itinerary = await synthesizer.synthesize(body);

    // 2. Attach destination intelligence & visa rules
    const visa = destinationIntel.getVisaRequirements(body.destination);
    const weather = destinationIntel.getWeatherAdvisory(body.destination);

    return NextResponse.json({
      success: true,
      data: {
        itinerary,
        destinationIntel: {
          visa,
          weather,
        },
      },
      meta: {
        engine: 'Voyage8-Canonical-Journey-Runtime',
        stagesExecuted: 16,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Itinerary synthesis error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
