import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { Orders } from "./components/orders";

const MyOrdersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/login");
  }
  const orders = await db.query.orderTable.findMany({
    where: eq(orderTable.userId, session?.user.id),
    orderBy: (orderTable, { desc }) => [desc(orderTable.createdAt)],
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  return (
    <>
      <Header />
      <div className="px-5 pb-5">
        <h1 className="mb-6 text-2xl font-bold">Meus pedidos</h1>
        <Orders
          orders={orders.map((order, index) => ({
            number: `#${String(index + 1).padStart(3, "0")}`,

            id: order.id,
            totalPriceInCents: order.totalPriceInCents,
            status: order.status,
            createdAt: new Date(order.createdAt),
            items: (order.items || []).map(
              (item: {
                id: string;
                productVariant: {
                  imageUrl: string;
                  product: {
                    name: string;
                  };
                  name: string;
                  priceInCents: number;
                };
                quantity: number;
              }) => ({
                id: item.id,
                imageUrl: item.productVariant.imageUrl,
                productName: item.productVariant.product.name,
                productVariantName: item.productVariant.name,
                priceInCents: item.productVariant.priceInCents,
                quantity: item.quantity,
              }),
            ),
          }))}
        />
      </div>
      <Footer />
    </>
  );
};

export default MyOrdersPage;
