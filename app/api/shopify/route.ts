// // app/api/shopify/route.ts
// import { getCollectionProducts } from 'lib/shopify';
// import { NextResponse } from 'next/server';

// export const runtime = 'edge';

// export async function GET(): Promise<NextResponse> {
//   try {
//     const homepageItems = await getCollectionProducts({
//       collection: 'hidden-featured-items'
//     });
//     return new NextResponse(JSON.stringify(homepageItems), {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//   } catch (error) {
//     return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
//       status: 500,
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//   }
// }

import { getCollectionProducts } from 'lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const url = request.nextUrl;
  const collection = url.searchParams.get('collection') || 'hidden-featured-items'; // Default to 'hidden-featured-items'

  try {
    const collectionProducts = await getCollectionProducts({
      collection: collection
    });
    return new NextResponse(JSON.stringify(collectionProducts), {
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
