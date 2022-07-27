import Image from 'next/image';

export default function ImageSection() {
  return (
    <div
      style={{
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        zIndex: -1,
      }}
    >
      <Image
        alt="HackSC Logo Background"
        src="/img/light-desktop-bg.svg"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </div>
  );
}
