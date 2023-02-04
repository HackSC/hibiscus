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
            color: Colors2023.BLUE.STANDARD,
            fontSize: '30px',
          }}
        >
          Welcome, {user.firstName}
        </H1>
        <Text style={{ color: '#989898' }}>
          What would you like to do today?
        </Text>
      </div>
    </div>
  );
};
