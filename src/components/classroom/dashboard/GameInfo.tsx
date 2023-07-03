"use client"

import { Member } from "@prisma/client";
import React from "react";
import { ModalBase, ModalButton } from "@/components/use-client/Modal";
import clsx from "clsx";

type RankingItems = {
  username: string;
  xp: number;
}

export default function GameInfo(p: {
  member: Member,
  rankingList: RankingItems[]
  isMember: boolean
}) {
  const userLevel = (p.member.xp / 100).toFixed();
  const modulo = p.member.xp % 100;
  const rankingList = p.rankingList
  const isMember = p.isMember

  return (
    <div className="rounded-lg bg-dark1 p-4 flex flex-row space-x-4 w-full">
      { isMember && (
        <>
          <div className="flex flex-col rounded-md border-2 p-2 border-light0">
            <div className="text-xs m-auto text-center text-light1">LEVEL</div>
            <div className="text-xl m-auto text-center">{ userLevel }</div>
          </div>

          <div className="flex flex-col gap-2 text-light0 w-full justify-center">
            <div className="flex flex-row justify-between w-full">
              <span>{ modulo } / 100</span>
              <span className="text-right">XP</span>
            </div>
            <div className="rounded-xl h-4 w-full bg-dark0">
              <div
                className="rounded-xl h-4 bg-light0"
                style={ {
                  width: `${modulo}%`,
                } }
              />
            </div>
          </div>
        </>
      ) }
      <div className={ clsx(
        !isMember && "flex flex-col w-full",
        "self-center"
      ) }>
        <RankingModal
          usersList={ rankingList }
        >
          <ModalButton label="Ranking List" onClick={ () => { } } />
        </RankingModal>
      </div>
    </div>
  );
}

export function RankingModal({ usersList, children }: { usersList: RankingItems[], children: React.ReactNode }) {
  const rankingItems = usersList.sort((a, b) => b.xp - a.xp)
  return (
    <ModalBase title="Ranking" trigger={ children } size="lg">
      <div className="flex flex-col gap-y-2 max-h-pc55 overflow-y-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b divide-x">
              <th className="text-center">Rank</th>
              <th className="text-center mx-auto">Username</th>
              <th className="text-center">XP</th>
            </tr>
          </thead>
          <tbody className="gap-y-2">
            { rankingItems.map(
              (item, index) => (
                <tr key={ index } className="pb-2 text-sm">
                  <td className="text-center">{ index + 1 }</td>
                  <td className="text-center">{ item.username }</td>
                  <td className="text-center">{ item.xp }</td>
                </tr>
              )
            ) }
          </tbody>
        </table>
      </div>
    </ModalBase>
  );
}
