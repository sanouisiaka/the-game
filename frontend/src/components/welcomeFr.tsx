import { signIn } from 'next-auth/react';
import Title from '@/components/elements/title';
import GoogleSvg from '@/components/elements/svg/googleSvg';
import { Modal } from 'flowbite-react';

export default function WelcomeFr() {

  return (
    <Modal show={true} size='5xl' initialFocus={undefined} className='overflow-hidden'>
      <Modal.Body>
        <div className='text-center'>
          <div className='block text-2xl font-bold'>Bienvenue sur <Title /></div>
          <br />
          <div className='block'>Plonge dans le monde du pari sportif <span className='font-semibold text-sunset-500'>sans dépenser 1 centime !</span>
          </div>
          <div className='block'>
            Paries des <span className='text-violet-700 font-bold'>BetCoins</span> et compare tes résultats à ceux des joueurs du monde entier.
          </div>
          <div className='block'><span className='font-semibold text-sunset-500'>Récompenses quotidiennes</span>, <span
            className='font-semibold text-sunset-500'>défis</span>, <span
            className='font-semibold text-sunset-500'>boosts</span>... plein de choses sont à venir sur <Title />.
          </div>
          <br />
          <div className='has-text-primary font-semibold text-xl'>Connecte-toi et monte dans le train, l&apos;aventure ne fait que
            commencer...
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='justify-center'>
        <button className='font-semibold' onClick={() => signIn('google')}>
          <div className='flex rounded border-2 border-sunset-600 text-sunset-500 p-2'>
            <div className='mr-2'>
              <GoogleSvg />
            </div>
            Se connecter avec Google
          </div>

        </button>
      </Modal.Footer>
    </Modal>
  );
}