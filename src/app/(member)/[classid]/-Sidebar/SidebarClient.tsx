"use client";

import { ClientAPI } from "@/api/client/api";
import { useUserid } from "@/api/client/auth";
import { CaretDown, Plus } from "@phosphor-icons/react";
import { Classroom } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useState, useTransition } from "react";
import { SidebarItem } from "./SidebarItem";
import { SidebarCategoryIcon } from "./SidebarIcons";
import { useRoom } from "../../-Navbar/Navbar";
import { useCreateCategory } from "@/api/client/category";
import { usePathname, useRouter } from "next/navigation";
import { addCategory } from "./addsidebar";
import { ButtonTooltip } from "@/components/use-client/Tooltip";
import { ModalBase } from "@/components/use-client/Modal";
import { Route } from "next";
import CategoryForm from "./CategoryForm";

export { List } from "@radix-ui/react-tabs";

export function SidebarHeader(p: {}) {
  const { currentId, userData } = useRoom();
  const userid = useUserid();
  const qc = useQueryClient();

  const { data } = useQuery({
    queryKey: ["classrooms", currentId, "data"],
    queryFn() {
      return ClientAPI.getClassroom({ userid, classid: currentId });
    },
    enabled: !!userid && !!currentId,
  });

  return (
    <div
      className={ clsx(
        "font-bold leading-5 py-4 px-4 border-slate-700 truncate",
        "text-sm",
        "flex",
        "gap-1"
      ) }
    >
      <div className="truncate text-white">
        { data ? data.name : "loading..." }
      </div>
    </div>
  );
}

export function CategoryList(p: {
  isOwner: boolean;
}) {
  const { currentId, userData } = useRoom();
  const userid = useUserid();

  const qc = useQueryClient();

  // So ugly 🤮
  const { data: categoryList, error } = useQuery({
    queryKey: ["classrooms", currentId, "categorylist"],
    queryFn() {
      return ClientAPI.getCategoryList({ userid, classid: currentId });
    },
    enabled: !!userid && !!currentId,
    staleTime: 30,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    console.log(`CategoryList Rerender ${currentId}`);
  }, []);
  return (
    <>
      { categoryList ? (
        categoryList.map((page, idx) => (
          <SidebarItem
            key={ page.id }
            id={ page.id }
            icon={ <SidebarCategoryIcon /> }
            label={ page.title }
            isCategory
            isOwner={ p.isOwner }
          />
        ))
      ) : (
        <div className="text-light1 text-sm">Loading Categories</div>
      ) }
    </>
  );
}

export function AddCategoryButton() {
  const room = useRoom();
  const [isOpen, setIsOpen] = useState(false)
  const { push } = useRouter();
  const pathname = usePathname()
  const userid = useUserid()

  return (
    <>

      <ButtonTooltip label="Add New Category">
        <button
          className="text-light2 hover:text-light0 text-sm"
          onClick={ () => setIsOpen(true)
          }
        >
          <Plus weight="bold" />
        </button>
      </ButtonTooltip>

      <ModalBase
        open={ isOpen }
        size="xl"
        title="New Category"
        onChange={ setIsOpen }
      >
        <CategoryForm
          onCancel={ () => setIsOpen(false) }
          onUpdated={ () => setIsOpen(false) }
          onDeleted={ () => { } }
          idData={ {
            userid, classid: room.currentId
          } }
        />
      </ModalBase>
    </>
  )
}
