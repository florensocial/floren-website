export function Icon({ name, className='' }: { name: 'arrow'|'sparkle'|'check'|'send'|'menu'|'x', className?: string }) {
 const common={className, width:24, height:24, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', strokeWidth:1.8, strokeLinecap:'round' as const, strokeLinejoin:'round' as const, 'aria-hidden':true};
 if(name==='arrow') return <svg {...common}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>;
 if(name==='sparkle') return <svg {...common}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/></svg>;
 if(name==='check') return <svg {...common}><path d="m5 12 4 4L19 6"/></svg>;
 if(name==='send') return <svg {...common}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>;
 if(name==='menu') return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
 return <svg {...common}><path d="M18 6 6 18M6 6l12 12"/></svg>;
}
