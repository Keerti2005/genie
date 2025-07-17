import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import NavigationHeader from "@/components/NavigationHeader";

const CartPage: React.FC = () => {
  const { items, getTotalPrice, removeFromCart, updateQuantity, clearCart } = useCart();

  return (
    <div className="min-h-screen">
      <NavigationHeader />
      <div className="max-w-4xl mx-auto p-6 pt-14 space-y-6"> {/* Added pt-24 for space from navbar */}
        <h1 className="text-3xl font-bold text-green-700 mb-4">Your Cart</h1>

        {items.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
              <Link to="/product">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Browse Products</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Button
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-between items-center mt-6">
              <p className="text-xl font-semibold text-green-700">
                Total: ${getTotalPrice().toFixed(2)}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white">Checkout</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
