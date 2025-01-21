import Link from "next/link";

export default function AltLanding() {
  return (
    <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-8 lg:gap-12 text-2xl lg:text-7xl tracking-widest font-medium">
      <div className="flex w-3/4 justify-between">
        <Link href="/portfolio/ohio">
          <p className="hover:text-stone-950 transition ease-in-out duration-500">
            OHIO
          </p>
        </Link>
        <Link href="/portfolio/california">
          <p className="hover:text-stone-950 transition ease-in-out duration-500">
            CALIFORNIA
          </p>
        </Link>
      </div>
      <div className="flex w-3/4 justify-between">
        <Link href="/portfolio/maryland">
          <p className="hover:text-stone-950 transition ease-in-out duration-500">
            MARYLAND
          </p>
        </Link>
        <Link href="/portfolio/ireland">
          <p className="hover:text-stone-950 transition ease-in-out duration-500">
            IRELAND
          </p>
        </Link>
      </div>
      <div className="flex w-3/4 justify-between group">
        <Link href="/portfolio/united-kingdom">
          <p className=" hover:text-stone-950 group-hover:text-stone-950 transition ease-in-out duration-500">
            UNITED
          </p>
        </Link>
        <Link href="/portfolio/united-kingdom">
          <p className=" hover:text-stone-950 group-hover:text-stone-950 transition ease-in-out duration-500">
            KINGDOM
          </p>
        </Link>
      </div>
    </div>
  );
}
