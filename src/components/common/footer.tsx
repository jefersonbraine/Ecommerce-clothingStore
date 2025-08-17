const Footer = () => {
  return (
    <footer className="bg-accent mt-auto w-full p-8">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-medium md:text-sm">
              © 2025 Copyright BEWEAR
            </p>
            <p className="text-muted-foreground text-xs font-medium md:text-sm">
              Todos os direitos reservados.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs hover:underline md:text-sm">
                Termos de uso
              </a>
              <a href="#" className="text-xs hover:underline md:text-sm">
                Política de privacidade
              </a>
              <a href="#" className="text-xs hover:underline md:text-sm">
                Contato
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
