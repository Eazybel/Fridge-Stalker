import Header from "@/app/components/Header/HeaderCategory"
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Header/>
        {children}
        </body>
    </html>
  );
}