'use client'

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import StreamsSection from "@/components/streams/StreamsSection";

export default function StreamsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <StreamsSection />
      <Footer />
    </div>
  )
}
