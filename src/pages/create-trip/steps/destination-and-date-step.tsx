import { MapPin, Calendar, Settings2, ArrowRight, X } from "lucide-react"
import { Button } from "../../../componenets/button"
import { useState } from "react"
import { DateRange, DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css";
import { format } from 'date-fns'

interface DestinationAndDateStepProps {
    isGuestInputOpen: boolean
    eventStartAndEndDates: DateRange | undefined
    closeGuestInputOpen: () => void
    openGuestInputOpen: () => void
    setDestination: (destination: string) => void
    setEventStartAndEndDates: (dates: DateRange | undefined) => void
}


export const DestinationAndDateStep = (
    {
        closeGuestInputOpen,
        isGuestInputOpen, 
        openGuestInputOpen, 
        setDestination, 
        eventStartAndEndDates,
        setEventStartAndEndDates
    }: DestinationAndDateStepProps) => {

    const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false)

    const openDatePicker = () => {
        setIsDatePickerOpen(true)
    }

    const clonseDatePicker = () => {
        setIsDatePickerOpen(false)
    }

    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to ?
        format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
        : null

    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
                <MapPin className="size-5 text-zinc-400" />
                <input
                    type="text"
                    disabled={isGuestInputOpen}
                    placeholder="Para onde você vai?"
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                    onChange={event => setDestination(event.target.value)}
                />
            </div>

            <button onClick={openDatePicker} disabled={isGuestInputOpen} className="flex items-center gap-2 text-left w-[250px]">
                <Calendar className="size-5 text-zinc-400" />
                <span className="text-lg text-zinc-400 w-40 flex-1">
                    {displayedDate || 'Quando?'}
                </span>
            </button>

            {
                isDatePickerOpen &&
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                        <div className="space-y-2">
                            <div className="flex items-start justify-between">
                                <h2 className="text-lg font-semibold">
                                    Selecione a data
                                </h2>
                                <button type="button" onClick={clonseDatePicker}>
                                    <X className="size-5 text-zinc-400" />
                                </button>
                            </div>
                        </div>

                        <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
                    </div>
                </div>
            }

            <div className="w-px h-6 bg-zinc-800"></div>

            {isGuestInputOpen ? (
                <Button onClick={closeGuestInputOpen} variant="secondary">
                    Alterar local/data
                    <Settings2 className="size-5" />
                </Button>
                // <button
                //     onClick={closeGuestInputOpen}
                //     className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700"
                // >
                //     Alterar local/data
                //     <Settings2 className="size-5" />
                // </button>
            ) : (
                <Button
                    onClick={openGuestInputOpen}
                    variant="primary">
                    Continuar
                    <ArrowRight className="size-5" />
                </Button>
            )}
        </div>
    )
}