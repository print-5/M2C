# OrderConfirmation Component Usage Examples

The OrderConfirmation component now uses the shared products data from `src/data/products.ts`. Here are different ways to use it:

## Basic Usage (Default Order)
```tsx
<OrderConfirmation />
```
This will show a default order with:
- Premium Cotton T-Shirt (qty: 2)
- Denim Jeans - Slim Fit (qty: 1)
- Leather Wallet (qty: 1)

## Custom Order Items
```tsx
const customOrderItems = [
  { productId: '1', quantity: 2 }, // Handwoven Cotton Kitchen Towel Set
  { productId: '2', quantity: 1 }, // Organic Bath Towel Set
  { productId: '4', quantity: 3 }  // Premium Cotton T-Shirt
];

<OrderConfirmation 
  isConfirmed={true}
  orderItems={customOrderItems}
/>
```

## Pending Order
```tsx
<OrderConfirmation 
  isConfirmed={false}
  orderItems={[
    { productId: '3', quantity: 1 }, // Heritage Tea Towel Collection
    { productId: '5', quantity: 2 }  // Denim Jeans - Slim Fit
  ]}
/>
```

## Available Products
The following products are available in the shared data:

1. **Handwoven Cotton Kitchen Towel Set** (ID: '1') - $25.99
2. **Organic Bath Towel Set** (ID: '2') - $89.99
3. **Heritage Tea Towel Collection** (ID: '3') - $35.99
4. **Premium Cotton T-Shirt** (ID: '4') - $29.99
5. **Denim Jeans - Slim Fit** (ID: '5') - $79.99
6. **Leather Wallet** (ID: '6') - $49.99

## Features
- **Dynamic Product Loading**: Products are loaded from the shared data source
- **Real Product Images**: Uses actual product images from the assets folder
- **Automatic Calculations**: Subtotal, tax (8%), and total are calculated automatically
- **Product Details**: Shows product name, category, individual price, and quantity
- **Responsive Design**: Works on all screen sizes
- **Order Status**: Supports both confirmed and pending states

## Integration with Other Components
This component now shares the same product data with:
- VendorDashboard Products component
- Other product-related components throughout the application

This ensures consistency across the entire application and makes it easy to manage product data from a single source.