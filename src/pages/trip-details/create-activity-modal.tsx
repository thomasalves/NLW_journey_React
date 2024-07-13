import { X, Tag, Calendar } from "lucide-react";
import { Button } from "../../componenets/button";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface CreateActivityModalProps{
    closeCreateActivityModal: () => void

}

export const CreateActivityModal= ({ closeCreateActivityModal} : CreateActivityModalProps) => {
    const {tripId} = useParams()

    const createActivity = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        

        const data = new FormData(event.currentTarget)

        const title = data.get('title')?.toString()
        const occurs_at = data.get('occurs-at')?.toString()

        await api.post(`/trips/${tripId}/activities`,{
            title,
            occurs_at
        })

        // closeCreateActivityModal()
        window.document.location.reload()
    }

    return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
                <div className="flex items-start justify-between">
                    <h2 className="text-lg font-semibold">
                        Cadastrar atividade
                    </h2>
                    <button type="button" onClick={closeCreateActivityModal}>
                        <X className="size-5 text-zinc-400" />
                    </button>
                </div>
                <p className="text-sm text-zinc-400">
                    Todos os convidados podem viualizar as atividades.
                </p>
            </div>

            <form onSubmit={createActivity} className="space-y-3">
                <div className="px-4 flex items-center flex-1 gap-2 h-14 bg-zinc-950 border-zinc-800 rounded-lg">
                    <Tag className="text-zinc-400 size-5" />
                    <input
                        type="text"
                        name="title"
                        placeholder="Qual a atividade"
                        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                    />
                </div>

                <div className='flex items-center gap-2'>
                    <div className=" flex-1 px-4 flex items-center flex-1 gap-2 h-14 bg-zinc-950 border-zinc-800 rounded-lg">
                        <Calendar className="text-zinc-400 size-5" />
                        <input
                            type="datetime-local"
                            name="occurs-at"
                            placeholder="Data e horário da atividade"
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                        />
                    </div>
                </div>

                <Button 
                    variant="primary"
                    size="full"
                >
                    Salvar atividade
                </Button>
            </form>
        </div>
    </div>
    );
}
