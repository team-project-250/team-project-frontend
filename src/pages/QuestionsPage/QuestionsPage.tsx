import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Questions } from '../../components/Questions';

export const QuestionsPage = () => {
  return (
    <>
      <Breadcrumbs
        items={[{ label: 'Головна', path: '/' }, { label: 'Питання та відповіді' }]}
      />

      <Questions />
    </>
  );
};
