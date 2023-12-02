import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import Title from '@/components/elements/title';

export default function Welcome() {

  return (
    <div className="box flex h-full flex-col justify-between mx-2.5 md:mx-20 text-center text-l md:text-xl">
      <div className="block font-semibold">
        <span className="font-bold has-text-primary-dark uppercase text-5xl md:text-6l">Bet</span>
        <span className="text-2xl md:text-3xl ">ThemAll</span>
      </div>
      <div className="block">
        <div className="block">Bienvenue sur <Title/></div>

        <div className="block">Ici paris sur les matchs du monde entier en depensant <span className="font-bold">0 euros</span>.</div>
        <div className="block">Grâce aux <span className="text-yellow-500 font-bold">BetCoins</span>, parie et compare tes resultats avec ceux de tes amis dans une ligue privé ou compare toi au joueur du monde entier.</div>
        <div className="block"><span className="font-bold">Récompense quotidien</span>, <span className="font-bold">défis</span>, <span className="font-bold">combiné</span>... plein de choses sont à venir sur <Title/>.</div>
        <div className="has-text-primary font-bold" >Connecte toi et monte dans le train, l&apos;aventure ne fait que commencer...</div>
      </div>

      <div><FontAwesomeIcon icon={faArrowDown}/></div>

      <div>
        <button className="button font-semibold" onClick={() => signIn('google')}>
          <span className="mr-2">
            <Image
              src="/google_logo.svg"
              alt="Google Logo"
              width="24"
              height="24"
            />
          </span>
          Se connecter avec Google
        </button>
      </div>

    </div>
  )
}