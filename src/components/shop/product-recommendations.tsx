"use client";

import React from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppStore, useCartStore } from "@/store";
import { formatPrice } from "@/lib/utils";
import { mockProducts, type ExtendedProduct } from "@/lib/mock-data";
import type { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface ProductRecommendationsProps {
  currentProduct: Product | ExtendedProduct;
  type?: "similar" | "bought-together";
}

export function ProductRecommendations({ 
  currentProduct, 
  type = "similar" 
}: ProductRecommendationsProps) {
  const { language } = useAppStore();
  const { addItem, items } = useCartStore();
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Get recommendations based on type
  const recommendations = React.useMemo(() => {
    if (type === "similar") {
      // Similar products based on category, brand, price range
      return mockProducts
        .filter((p) => p.id !== currentProduct.id)
        .filter((p) => {
          const sameCategory = p.category === currentProduct.category;
          const sameBrand = p.brand === currentProduct.brand;
          const similarPrice = Math.abs(p.price - currentProduct.price) < currentProduct.price * 0.5;
          return sameCategory || sameBrand || similarPrice;
        })
        .slice(0, 6);
    } else {
      // Bought together - accessories and complementary products
      const accessories = mockProducts.filter(
        (p) => p.id !== currentProduct.id && p.category === "ACCESSORIES"
      );
      const monitors = currentProduct.category === "LAPTOPS" || currentProduct.category === "DESKTOPS"
        ? mockProducts.filter((p) => p.category === "MONITORS")
        : [];
      const storage = mockProducts.filter((p) => p.category === "STORAGE");
      
      return [...accessories, ...monitors, ...storage]
        .filter((p) => p.id !== currentProduct.id)
        .slice(0, 4);
    }
  }, [currentProduct, type]);

  const handleScroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 300;
      const newPosition = direction === "left" 
        ? scrollPosition - scrollAmount 
        : scrollPosition + scrollAmount;
      containerRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };

  const handleAddToCart = (product: Product | ExtendedProduct) => {
    addItem({
      id: product.id,
      name: language === "no" ? product.nameNo : product.name,
      price: product.price,
      image: product.images[0],
      grade: product.grade,
      sku: product.sku,
    });
  };

  const handleAddAllToCart = () => {
    recommendations.forEach((product) => {
      handleAddToCart(product);
    });
  };

  const isInCart = (productId: string) => {
    return items.some((item) => item.id === productId);
  };

  const totalPrice = recommendations.reduce((sum, p) => sum + p.price, 0);

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {type === "similar"
            ? language === "no" ? "Du kan også like" : "You might also like"
            : language === "no" ? "Ofte kjøpt sammen" : "Frequently bought together"}
        </h2>
        {type === "similar" && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll("left")}
              className="h-8 w-8"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll("right")}
              className="h-8 w-8"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {type === "similar" ? (
        /* Similar Products Carousel */
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {recommendations.map((product) => (
            <Card key={product.id} className="flex-shrink-0 w-64 overflow-hidden group">
              <div className="relative aspect-square bg-gray-100">
                <Link href={`/nettbutikk/${product.id}`}>
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={language === "no" ? product.nameNo : product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No image
                    </div>
                  )}
                </Link>
                <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs">
                  {language === "no" ? "Grad" : "Grade"} {product.grade}
                </Badge>
              </div>
              <CardContent className="p-3">
                <Link href={`/nettbutikk/${product.id}`}>
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-2 hover:text-green-600 transition-colors">
                    {language === "no" ? product.nameNo : product.name}
                  </h3>
                </Link>
                <p className="text-xs text-gray-500 mt-1">{product.brand}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  <Button
                    size="sm"
                    variant={isInCart(product.id) ? "secondary" : "default"}
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className="h-8"
                  >
                    {isInCart(product.id) ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <ShoppingCart className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Bought Together Bundle */
        <Card className="p-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Current Product */}
            <div className="text-center">
              <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden mx-auto">
                {currentProduct.images[0] ? (
                  <Image
                    src={currentProduct.images[0]}
                    alt={language === "no" ? currentProduct.nameNo : currentProduct.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No image
                  </div>
                )}
              </div>
              <p className="text-sm font-medium mt-2 line-clamp-1">
                {language === "no" ? currentProduct.nameNo : currentProduct.name}
              </p>
              <p className="text-sm font-bold">{formatPrice(currentProduct.price)}</p>
            </div>

            {recommendations.map((product, index) => (
              <React.Fragment key={product.id}>
                <span className="text-2xl text-gray-400">+</span>
                <div className="text-center">
                  <Link href={`/nettbutikk/${product.id}`}>
                    <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden mx-auto hover:ring-2 hover:ring-green-500 transition-all">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={language === "no" ? product.nameNo : product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium mt-2 line-clamp-1 hover:text-green-600">
                      {language === "no" ? product.nameNo : product.name}
                    </p>
                  </Link>
                  <p className="text-sm font-bold">{formatPrice(product.price)}</p>
                </div>
              </React.Fragment>
            ))}

            <span className="text-2xl text-gray-400">=</span>

            {/* Total and Add All Button */}
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">
                {formatPrice(currentProduct.price + totalPrice)}
              </p>
              <p className="text-sm text-gray-500 mb-3">
                {language === "no" ? "Totalt" : "Total"}
              </p>
              <Button onClick={handleAddAllToCart}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                {language === "no" ? "Legg alle i kurv" : "Add all to cart"}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
