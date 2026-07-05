import { Site } from '@/components/site';
export default async function ContactPage({ searchParams }: { searchParams: Promise<{ package?: string }> }) { const params = await searchParams; return <Site contactOnly selectedPackage={params.package || ''} />; }
