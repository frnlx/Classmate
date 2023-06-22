'use client'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { fetchFromCDN, fetchMessages, fetchShortcodes, Emoji } from 'emojibase'
import { useState } from 'react'
import './EmojiPicker.css'

export default function EmojiPickerAlfon(p: {
  onEmojiClick: (emoji: string) => void
}) {

  const { data: emojis, isLoading } = useQuery({
    queryKey: ['emojis'],
    async queryFn() {
      return await fetchFromCDN('en/data.json') as Emoji[]
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  const { data: groups, isLoading: loading2 } = useQuery({
    queryKey: ['emojigroups'],
    async queryFn() {
      return await fetchMessages('en')
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  const [filter, setFilter] = useState<number>(0)

  // const usedem = emojis?.filter(e => e.group)
  // groups && console.log(groups)

  const filtered = emojis?.filter(e => e.type === 1)
  const compact = filtered?.map(e => e.emoji)

  const [search, setSearch] = useState('')

  const filteredEmoji = emojis?.filter(e =>
    e.group !== 0 && e.group !== 1 && e.group && e.group !== 2 && e.group !== 9 && e.group !== 8 &&
    e.version !== 15 &&
    (e.label.match(search) || e.tags?.some(t => t.match(search)) || e.emoji === search)
  ) as Emoji[]

  return (
    <div className={ clsx(
      "pickerroot w-full h-full bg-dark0 rounded-lg flex justify-center items-center",
      
      "border !bg-dark0",

      "outline-transparent",
      "transition-all ring-0",
      "ring-dark2/50",
      "group-focus-within:ring-dark2/50",
      "group-focus-within:outline-none",
      "group-focus-within:ring-4",
    ) } tabIndex={0}>
      {/* <Picker data={ data } onEmojiSelect={ (e:any) => {
        p.onEmojiClick(e.native)
      } }
        navPosition="none"
        previewPosition="none"
        emojiButtonSize={ 24 }
        emojiSize={ 16 }
        perLine={ 13 }
        categories={ ['frequent', 'nature', 'foods', 'activity', 'places', 'objects'] }
      /> */}
      { isLoading && (
        <div className="text-sm text-light1 ">Loading Emoji Picker...</div>
      ) }
      {
        !isLoading && !loading2 && groups && emojis ? (
          <div className="flex flex-col">
            <input
              className="bg-transparent w-full rounded-md focus-within:outline-none p-3 text-xs"
              onChange={ (e) => {
                // console.log(e.target.value)
                setSearch(e.target.value)
              } }
              placeholder="Search Emoji..."
            />
            <div className="overflow-y-auto h-full">
              {
                search === '' ? groups.groups.filter(g =>
                  g.key !== 'component' &&
                  g.key !== 'smileys-emotion' &&
                  g.key !== 'flags' &&
                  g.key !== 'symbols' &&
                  g.key !== 'people-body').map(g => {
                    const emojispergroup = emojis.filter(e =>
                      e.group === g.order &&
                      e.version !== 15 &&
                      e.label.match(search))

                    if (emojispergroup.length > 0)
                      return (
                        // list
                        <div key={ g.key } className="text-left text-[10px] uppercase text-light0 ml-3 p-1">
                          <div className="sticky top-0 bg-dark0 z-10">
                            { g.message }
                          </div>

                          <div className="flex flex-row flex-wrap">
                            {
                              emojis.filter(e =>
                                e.group === g.order &&
                                e.version !== 15 &&
                                e.label.match(search)).map(e => (
                                  <EmojiListItem key={ e.label } e={ e } onEmojiClick={ p.onEmojiClick } />
                                ))
                            }
                          </div>

                        </div>
                      )
                  }) : (
                  // list
                  <div className="flex flex-row flex-wrap ml-3 p-1">
                    {
                      filteredEmoji.length > 0 ? filteredEmoji.map(e => (
                        <EmojiListItem key={ e.label } e={ e } onEmojiClick={ p.onEmojiClick } />
                      )) : (
                        <div className="h-full w-full text-center leading-10 text-sm text-light0">
                          Emoji { search } not found...
                        </div>
                      )
                    }
                  </div>
                )
              }
            </div>
          </div>
        ) : null
      }
    </div>
  )
}

function EmojiListItem(p: {
  e: Emoji
  onEmojiClick: (s: string) => void
}) {
  return (
    <div key={ p.e.order } className={ clsx(
      "transition-all duration-75",
      "w-6 text-base text-center",
      "hover:bg-white/20 hover:scale-150",
      "hover:rounded-sm",
      "select-none cursor-pointer"
    ) }
      title={ p.e.label }
      onClick={ () => {
        console.log(p.e)
        p.onEmojiClick(p.e.emoji)
      } }
    >
      { p.e.emoji }
    </div>
  )
}