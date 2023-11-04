import { Colors2023 } from '@hibiscus/styles';
import { H1, Text } from '@hibiscus/ui';

import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';

export const BattlepassWelcomeHeader = () => {
  const { user } = useHibiscusUser();
  return (
    <div
      style={{
        display: 'inline-flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <H1
          style={{
            color: 'black',
            fontSize: '30px',
            fontFamily: "'filson-pro', sans-serif",
          }}
        >
          Your Leaderboard
        </H1>
        <Text style={{ color: '#989898' }}>
          Check your ranking on the leaderboard and win prizes!
        </Text>
      </div>
    </div>
  );
};
