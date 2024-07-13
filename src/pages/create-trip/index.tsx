import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guest-modal";
import { ConfirmeTripModal } from "./confirme-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestStep } from "./steps/invite-guests-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTripPage() {
    const navigate = useNavigate();
    const [isGuestInputOpen, setIsGuestInputOpen] = useState<boolean>(false);
    const [isGuestModalOpen, setIsGuestModalOpen] = useState<boolean>(false);
    const [isConfirmeTripModalOpen, setIsConfirmeTripModalOpen] = useState<boolean>(false);
    const [destinations, setDestinations] = useState('');
    const [ownerName, setOwnerName] = useState('')
    const [ownerEmail, setOwnerEmail] = useState('')
    const [emailsToInvite, setEmailToInvite] = useState<string[]>([
        "thomas.alves1111@gmail.com",
    ]);
    const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

    const openGuestInputOpen = () => {
        setIsGuestInputOpen(true);
    };

    const closeGuestInputOpen = () => {
        setIsGuestInputOpen(false);
    };

    const openGuestModal = () => {
        setIsGuestModalOpen(true);
    };
    const closeGuestModal = () => {
        setIsGuestModalOpen(false);
    };
    const openConfirmeTripModal = () => {
        setIsConfirmeTripModalOpen(true);
    };
    const closeConfirmeTripModal = () => {
        setIsConfirmeTripModalOpen(false);
    };
    const  createTrip = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!destinations) {
            return
        }

        if(!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
            return
        }

        if(emailsToInvite.length === 0) {
            return
        }

        if(!ownerEmail || !ownerName) {
            return
        }

        const response = await api.post('/trips',
            {
                destination: destinations,
                starts_at: eventStartAndEndDates.from,
                ends_at: eventStartAndEndDates.to,
                emails_to_invite: emailsToInvite,
                owner_name: ownerName,
                owner_email: ownerEmail
            }
        )   
        const { tripId } = response.data   
         navigate(`/trips/${tripId}`);
    };

    const addEmailToInvite = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email")?.toString();

        if (!email) {
            return;
        }
        if (emailsToInvite.includes(email)) {
            return;
        }

        setEmailToInvite([...emailsToInvite, email]);

        event.currentTarget.reset();
    };
    const removeEmailToInvite = (emailToRemove: string) => {
        const newEmailList = emailsToInvite.filter(
            (email) => email !== emailToRemove
        );
        setEmailToInvite(newEmailList);
    };
    return (
        <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-3xl w-full px-6 text-center space-y-10">
                <div className="flex flex-col items-center gep-3">
                    <img src="./logo.svg" alt="plann.er" />
                    <p className="text-zinc-300 text-lg ">
                        Convide seus amigos e planeje sua próxima viagem!
                    </p>
                </div>

                <div className="space-y-4">
                    <DestinationAndDateStep
                        closeGuestInputOpen={closeGuestInputOpen}
                        isGuestInputOpen={isGuestInputOpen}
                        openGuestInputOpen={openGuestInputOpen}
                        setDestination={setDestinations}
                        setEventStartAndEndDates={setEventStartAndEndDates}
                        eventStartAndEndDates={eventStartAndEndDates}
                    />

                    {isGuestInputOpen && (
                        <InviteGuestStep
                            emailsToInvite={emailsToInvite}
                            openConfirmeTripModal={openConfirmeTripModal}
                            openGuestModal={openGuestModal}
                        />
                    )}
                </div>
                <p className="text-sm text-zinc-500">
                    Ao planejar sua viajem pela plann.er você automaticamente concorda{" "}
                    <br />
                    com nossos{" "}
                    <a className="text-zinc-300 underline" href="#">
                        termos de uso{" "}
                    </a>
                    e{" "}
                    <a className="text-zinc-300 underline" href="#">
                        politicas de privacidade.
                    </a>
                </p>
            </div>

            {isGuestModalOpen && (
                <InviteGuestsModal
                    addEmailToInvite={addEmailToInvite}
                    closeGuestModal={closeGuestModal}
                    emailsToInvite={emailsToInvite}
                    removeEmailToInvite={removeEmailToInvite}
                />
            )}
            {isConfirmeTripModalOpen && (
                <ConfirmeTripModal
                    closeConfirmeTripModal={closeConfirmeTripModal}
                    createTrip={createTrip}
                    setOwenerName={setOwnerName}
                    setOwenerEmail={setOwnerEmail}
                />
            )}
        </div>
    );
}
