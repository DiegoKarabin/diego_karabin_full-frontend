import PageTitle from '@/components/commons/PageTitle';
import PageSubtitle from '@/components/commons/PageSubtitle';

export default function MyAlbumsTitle() {
  return (
    <div className="text-center mx-[15px] mb-8 md:mb-24 lg:mb-8">
      <PageTitle
        title="Mis álbumes"
        accentText="guardados"
      />
      <PageSubtitle
        lines={[
          'Disfruta tu música a un solo click y descubre que',
          'discos has guardado dentro de "Mis álbumes"',
        ]}
      />
    </div>
  );
}
