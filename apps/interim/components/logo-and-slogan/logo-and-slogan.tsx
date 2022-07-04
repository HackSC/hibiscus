/* eslint-disable-next-line */
export interface LogoAndSloganProps {}

export function LogoAndSloganSection(props: LogoAndSloganProps) {
  return (
    <div>
      <h1
        style={{
          fontWeight: 700,
          letterSpacing: -3,
          fontSize: 70,
          marginBottom: -10,
          marginTop: -10,
        }}
      >
        HackSC
      </h1>
      <h2
        style={{
          fontWeight: 300,
          color: '#939393',
          fontStyle: 'italic',
          fontSize: 20,
        }}
      >
        Southern California{`'`}s Flagship Hackathon
      </h2>
    </div>
  );
}

export default LogoAndSloganSection;
