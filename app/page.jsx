"use client";

import { AppProvider, Layout } from "@shopify/polaris";
import ProductTable from "./components/ProductTable";

export default function Home() {
  return (
    <AppProvider>
      <Layout>
        <Layout.Section>
          <ProductTable />
        </Layout.Section>
      </Layout>
    </AppProvider>
  );
}
