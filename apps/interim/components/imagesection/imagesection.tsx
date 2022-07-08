import Image from 'next/image';

export default function ImageSection() {
  return (
    <div
      style={{
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        zIndex: -1,
        top: 0,
        right: 0,
      }}
    >
      <Image
        alt="HackSC Logo Background"
        src="/light-desktop-bg.svg"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
