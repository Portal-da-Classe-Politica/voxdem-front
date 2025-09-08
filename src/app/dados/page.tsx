import { EmptyGraph, Section } from '../../components';
import Filters from './components/Filters';

export default function Dados() {

  return (
    <>
      <Section backgroundColor='bg-primary'>
        <div className="flex gap-8">
          <Filters />
          <EmptyGraph />
        </div>
      </Section>
    </>
  );
}