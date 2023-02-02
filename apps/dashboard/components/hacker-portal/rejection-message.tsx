import { H3, Link } from '@hibiscus/ui';

export const RejectionMessage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <H3>Thank you so much for your interest in HackSC 2023!</H3>
      <H3>
        We truly appreciate the time and effort you’ve put in your application.
        Unfortunately, after careful consideration, we sincerely regret to
        inform you that we are unable to offer you admission to the event at
        this time
      </H3>
      <H3>
        HackSC has seen record-breaking levels of interest this year and our
        venue simply cannot accommodate all of those who have applied. Our team
        is working extremely hard to increase our event{"'"}s capacity for next
        year – with a goal of making HackSC accessible to all who want to
        attend.
      </H3>
      <H3>
        We encourage you to apply again in the next hackathon! We will have many
        more cool upcoming events. Make sure to stay up to date with HackSC
        through{' '}
        <Link href="https://instagram.com/hackscofficial/" passHref underline>
          our social media
        </Link>
      </H3>
      <H3>We look forward to seeing you again 🌺</H3>
    </div>
  );
};
