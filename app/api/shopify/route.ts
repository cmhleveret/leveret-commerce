// app/api/shopify/route.ts
import { getCollectionProducts } from 'lib/shopify';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(): Promise<NextResponse> {
  try {
    const homepageItems = await getCollectionProducts({
      collection: 'hidden-featured-items'
    });
    return new NextResponse(JSON.stringify(homepageItems), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
