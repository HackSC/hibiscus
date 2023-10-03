import Script from 'next/script';

export interface HackformTally {
  tallyUrl: string;
}

export function HackformTally(props: HackformTally) {
  return (
    <>
      <iframe
        data-tally-src={props.tallyUrl}
        width="100%"
        height="335"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Hello World"
      ></iframe>

      <Script
        id="tally-js"
        src="https://tally.so/widgets/embed.js"
        onLoad={() => {
          // @ts-expect-error Tally is loaded in the linked script
          Tally.loadEmbeds();
        }}
      />
    </>
  );
}
