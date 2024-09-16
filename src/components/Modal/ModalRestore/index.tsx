type Pops = {
  email: string;
};

const ModalRestore = ({ email }: Pops) => {
  return (
    <div className="z-51 fixed bottom-0 left-0 right-0 top-0 z-20 flex h-[100%] min-h-[100vh] w-[100%] min-w-[375px] flex-col items-center justify-center bg-black bg-opacity-20">
      <div className="rounded-blockRadiusMax block w-[100%] max-w-[360px] rounded-[30px] border-solid border-zinc-300 bg-color-component-background p-10">
        <div className="mb-12 flex items-center justify-center">
          <img src="/logo.png" alt="logo" />
        </div>
        <p className="text-center">Ссылка для востановления пароля отправлена на {email}</p>
      </div>
    </div>
  );
};

export default ModalRestore;
