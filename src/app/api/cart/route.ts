/**
 * NORNEX AS - Cart API
 */

import { NextRequest, NextResponse } from 'next/server';

// In production, this would be stored in a database/session
const cart: Map<string, { productId: string; quantity: number }> = new Map();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action, productId, quantity = 1 } = body;

  switch (action) {
    case 'add':
      const existing = cart.get(productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.set(productId, { productId, quantity });
      }
      return NextResponse.json({ 
        success: true, 
        message: 'Product added to cart',
        cartSize: cart.size 
      });

    case 'update':
      if (cart.has(productId)) {
        cart.set(productId, { productId, quantity });
      }
      return NextResponse.json({ 
        success: true, 
        message: 'Cart updated' 
      });

    case 'remove':
      cart.delete(productId);
      return NextResponse.json({ 
        success: true, 
        message: 'Product removed from cart' 
      });

    case 'clear':
      cart.clear();
      return NextResponse.json({ 
        success: true, 
        message: 'Cart cleared' 
      });

    default:
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
  }
}

export async function GET() {
  const items = Array.from(cart.values());
  return NextResponse.json({ items });
}
