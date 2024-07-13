import { UserRoundPlus, ArrowRight } from "lucide-react"
import { Button } from "../../../componenets/button"

interface InviteGuestStepProps {
    openGuestModal: () => void
    emailsToInvite: string[]
    openConfirmeTripModal: () => void
}

export const InviteGuestStep = ({ emailsToInvite, openConfirmeTripModal, openGuestModal }: InviteGuestStepProps) => {
    return (<div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
        <button
            type="button"
            onClick={openGuestModal}
            className="flex items-center gap-2 flex-1 text-left"
        >
            <UserRoundPlus className="size-5 text-zinc-400" />
            {emailsToInvite.length > 0 ? (
                <span className="text-lg text-zinc-100 flex-1">
                    {emailsToInvite.length} pessoas(s) convidado(s)
                </span>
            ) : (
                <span className="text-lg text-zinc-400 flex-1">
                    Quem estará na viagem?
                </span>
            )}
        </button>

        <div className="w-px h-6 bg-zinc-800"></div>

        <Button                  
            onClick={openConfirmeTripModal}
            variant="primary"
            >
            Confirmar viagem
            <ArrowRight className="size-5" />
        </Button>
    </div>
    )
}