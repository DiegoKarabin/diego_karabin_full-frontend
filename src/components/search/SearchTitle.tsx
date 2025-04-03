import PageTitle from '@/components/commons/PageTitle';
import PageSubtitle from '@/components/commons/PageSubtitle';

export default function SearchTitle() {
  return (
    <div className="text-center mx-[15px] mb-8 md:mb-24 lg:mb-8">
      <PageTitle
        title="Busca tus"
        accentText="artistas"
      />
      <PageSubtitle
        lines={[
          'Encuentra tus artistas favoritos gracias a nuestro',
          'buscador y guarda tus álbumes favoritos',
        ]}
      />
    </div>
  );
};
