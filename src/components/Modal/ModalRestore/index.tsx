type Pops = {
  email: string;
};

const ModalRestore = ({ email }: Pops) => {
  return (
    <div className="z-20 fixed left-0 top-0 bottom-0 right-0 z-51 flex h-[100%] min-h-[100vh] w-[100%] min-w-[375px] flex-col items-center justify-center bg-black bg-opacity-20">
      <div className="block w-[100%] max-w-[360px] rounded-blockRadiusMax border-solid border-zinc-300 bg-color-component-background p-10 rounded-[30px]">
        <div className="mb-12 flex items-center justify-center">
          <img src="/logo.png" alt="logo" />
        </div>
        <p className="text-center">Ссылка для востановления пароля отправлена на {email}</p>
      </div>
    </div>
  );
};

export default ModalRestore;
