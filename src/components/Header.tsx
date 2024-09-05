interface HeaderProps {
  title: string;
  user?: any;
}

export default function Header({ title, user }: HeaderProps) {
  return <header className="fixed top-0 left-0 w-full h-16 flex px-[17%] items-center text-2xl bg-black shadow-custom-dark z-50 text-white">{title}</header>;
}
