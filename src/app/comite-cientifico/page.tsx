import Image from 'next/image';

interface TeamMember {
  name: string;
  imageUrl: string;
  linkedin?: string;
  email?: string;
  instagram?: string;
}

const membros: TeamMember[] = [
  {
    name: 'Pesquisador 1',
    imageUrl: '/images/blog/DSC_0042.JPG',
    linkedin: '#',
    email: 'mailto:contato@voxdem.org',
    instagram: '#',
  },
  {
    name: 'Pesquisador 2',
    imageUrl: '/images/blog/DSC_0065.JPG',
    linkedin: '#',
    email: 'mailto:contato@voxdem.org',
  },
  {
    name: 'Pesquisadora 3',
    imageUrl: '/images/blog/DSC_0357.JPG',
    email: 'mailto:contato@voxdem.org',
    instagram: '#',
  },
  {
    name: 'Pesquisador 4',
    imageUrl: '/images/blog/DSC_0042.JPG',
    linkedin: '#',
    email: 'mailto:contato@voxdem.org',
  },
  {
    name: 'Pesquisadora 5',
    imageUrl: '/images/blog/DSC_0065.JPG',
    linkedin: '#',
    email: 'mailto:contato@voxdem.org',
    instagram: '#',
  },
  {
    name: 'Pesquisador 6',
    imageUrl: '/images/blog/DSC_0357.JPG',
    email: 'mailto:contato@voxdem.org',
    instagram: '#',
  },
];

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.56V9h3.554v11.452z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true">
      <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 1.83333C12.6667 1.83333 13 1.83333 14.0833 1.91667C16.8333 2 18.0833 3.33333 18.1667 6C18.25 7.08333 18.25 7.33333 18.25 10C18.25 12.6667 18.25 13 18.1667 14C18.0833 16.6667 16.75 18 14.0833 18.0833C13 18.1667 12.75 18.1667 10 18.1667C7.33333 18.1667 7 18.1667 6 18.0833C3.25 18 2 16.6667 1.91667 14C1.83333 12.9167 1.83333 12.6667 1.83333 10C1.83333 7.33333 1.83333 7 1.91667 6C2 3.33333 3.33333 2 6 1.91667C7 1.83333 7.33333 1.83333 10 1.83333ZM10 0C7.25 0 6.91667 0 5.91667 0.0833333C2.25 0.25 0.25 2.25 0.0833333 5.91667C0 6.91667 0 7.25 0 10C0 12.75 0 13.0833 0.0833333 14.0833C0.25 17.75 2.25 19.75 5.91667 19.9167C6.91667 20 7.25 20 10 20C12.75 20 13.0833 20 14.0833 19.9167C17.75 19.75 19.75 17.75 19.9167 14.0833C20 13.0833 20 12.75 20 10C20 7.25 20 6.91667 19.9167 5.91667C19.75 2.25 17.75 0.25 14.0833 0.0833333C13.0833 0 12.75 0 10 0ZM10 4.83333C7.16667 4.83333 4.83333 7.16667 4.83333 10C4.83333 12.8333 7.16667 15.1667 10 15.1667C12.8333 15.1667 15.1667 12.8333 15.1667 10C15.1667 7.16667 12.8333 4.83333 10 4.83333ZM10 13.3333C8.16667 13.3333 6.66667 11.8333 6.66667 10C6.66667 8.16667 8.16667 6.66667 10 6.66667C11.8333 6.66667 13.3333 8.16667 13.3333 10C13.3333 11.8333 11.8333 13.3333 10 13.3333ZM15.3333 3.5C14.6667 3.5 14.1667 4 14.1667 4.66667C14.1667 5.33333 14.6667 5.83333 15.3333 5.83333C16 5.83333 16.5 5.33333 16.5 4.66667C16.5 4 16 3.5 15.3333 3.5Z" />
    </svg>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="relative w-full aspect-square bg-gray-200">
        <Image
          src={member.imageUrl}
          alt={member.name}
          fill
          className="object-cover grayscale"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-black mb-2">{member.name}</h3>
        <div className="flex items-center gap-3 text-[#3D58F5]">
          {member.linkedin && (
            <a href={member.linkedin} aria-label="LinkedIn" className="hover:opacity-70">
              <LinkedinIcon />
            </a>
          )}
          {member.email && (
            <a href={member.email} aria-label="E-mail" className="hover:opacity-70">
              <MailIcon />
            </a>
          )}
          {member.instagram && (
            <a href={member.instagram} aria-label="Instagram" className="hover:opacity-70">
              <InstagramIcon />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ComiteCientifico() {
  return (
    <>
      <section className="bg-[#3D58F5] text-white py-16 lg:py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">Comitê Científico</h1>
          <p className="text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
            O VoxDem contou com pesquisadores e pesquisadoras nacionais e internacionais, especialistas em comportamento político e democracia, para avaliar a ferramenta e suas funcionalidades.
          </p>
        </div>
      </section>

      <section className="bg-white text-black py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-black mb-8">Membros</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {membros.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
