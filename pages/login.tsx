import { GetServerSideProps, NextPage } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import Head from "next/head";

interface LoginProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const Login: NextPage<LoginProps> = ({ providers }) => {
  return (
    <div
      className="flex min-h-screen w-full flex-col 
    items-center justify-center bg-black"
    >
      <Head>
        <title>Login</title>
      </Head>
      <img className="mb-5 w-52" src="https://links.papareact.com/9xl" />
      {Object.values(providers ?? {}).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            className="rounded bg-[#18D860] p-5 text-white"
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};
export default Login;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
