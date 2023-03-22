import { TipoNotificacao } from '@/interfaces/INotificaçao';
import { store } from '@/store';
import { NOTIFICAR } from '@/store/actions-types';

type Notificador = {
    notificar: (tipo: TipoNotificacao, titulo: string, texto: string) => void
}

export default () : Notificador => {
  const notificar = (tipo: TipoNotificacao, titulo: string, texto: string) : void => {
    store.commit(NOTIFICAR, {
      titulo,
      texto,
      tipo,
    });
  };

  return {
    notificar,
  };
};
