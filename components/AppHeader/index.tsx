"use client";
import { AppState } from "@/store/store";
import { product } from "@prisma/client";
import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import logo from "../../public/logo.png";
import SearchField from "../SearchBar";
import SideBarMenu from "../SideBarMenu";
import SwitchTheme from "./SwitchTheme";

function Index() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [category, setCategory] = useState<Array<product>>([]);
  const cart = useSelector((state: AppState) => state.cart);
  const total = cart.items.length;
  const cost = cart.items.reduce((a, b) => a + b.price, 0);
  const path = [
    { name: "Home", path: "/" },
    { name: "Product", path: "/products" },
    { name: "Sale", path: "/sale" },
  ];
  useEffect(() => {
    async function fetchCategory() {
      const getCategory = await fetch("/api/products/getCategory");
      const data = await getCategory.json();
      setCategory(data);
    }
    fetchCategory();
  }, []);
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <div className="rounded-ful hidden lg:flex">
            <Link className="" href="/">
              <Image
                src={logo}
                width={60}
                height={60}
                objectFit="fill"
                alt="logo"
                className="rounded-full"
              />
            </Link>
          </div>
          <div className="hidden lg:flex">
            {path.map((item, index) => (
              <div key={index}>
                <Link className="btn btn-ghost" href={item.path}>
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
          {/* --------------------------------------------- */}
          <div className="display lg:hidden">
            <AiOutlineMenu
              size={20}
              onClick={() => {
                setIsOpen(true);
              }}
            />
          </div>
          {isOpen ? (
            <div className=" fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 flex flex-col items-start bg-secondary z-50">
              <div className="flex justify-end w-full mt-4">
                <AiOutlineClose
                  size={20}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                />
              </div>
              <Link className="" href="/">
                <Image
                  src={logo}
                  width={60}
                  height={60}
                  objectFit="fill"
                  alt="logo"
                  className="rounded-full"
                />
              </Link>
              {path.map((item) => (
                <>
                  <Link className="btn btn-ghost" href={item.path}>
                    {item.name}
                  </Link>
                </>
              ))}
              <div>
                <SideBarMenu category={category} isOpen={() => isOpen} />
              </div>
            </div>
          ) : null}

          {/* --------------------------------------------- */}
        </div>
        <div className="flex-none gap-2">
          <div className="hidden sm:flex">
            <SearchField />
          </div>
          {/* --------------------------------------------- */}
          <div>
            <button
              title="search"
              className="sm:hidden"
              onClick={() => {
                setIsSearch(!isSearch);
              }}
            >
              <AiOutlineSearch size={"1.7rem"} />
            </button>
          </div>
          {/* --------------------------------------------- */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">{total}</span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 card card-compact dropdown-content w-60 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="text-sm">
                  {cart.items.map((item) => (
                    <div key={item.id}>
                      <p>
                        <label>{item.title}</label> x{item.quantity}
                      </p>
                    </div>
                  ))}
                </span>
                <span className="text-info">Subtotal: ${cost}</span>
                <div className="card-actions">
                  <Link href={"/cart"} className="btn btn-primary btn-block">
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex">
            <SwitchTheme />
          </div>

          {!false ? (
            <div>
              <Link className="btn btn-ghost" href="/login">
                {" "}
                login{" "}
              </Link>
            </div>
          ) : (
            <>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      src="/../public/favicon.ico"
                      width={60}
                      height={60}
                      objectFit="fill"
                      alt="logo"
                      className="rounded-full"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
      {isSearch ? (
        <div className="w-full">
          <SearchField />
        </div>
      ) : null}
    </div>
  );
}

export default Index;
