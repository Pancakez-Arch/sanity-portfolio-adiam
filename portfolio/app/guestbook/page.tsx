import { Button } from "@/components/ui/button"; // Importing Button component
import { Card, CardHeader } from "@/components/ui/card"; // Importing Card components
import { Input } from "@/components/ui/input"; // Importing Input component
import { Label } from "@/components/ui/label"; // Importing Label component
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components"; // Importing RegisterLink from Kinde Auth
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"; // Importing session utility for Kinde Auth
import { Form } from "../components/Form"; // Importing Form component
import prisma from "../lib/db"; // Importing Prisma DB client
import { Suspense } from "react"; // Importing Suspense for lazy loading
import { GuestbookFormLoading, LoadingMessages } from "../components/LoadingState"; // Importing loading states

// Fetches the latest guestbook entries from the database
async function getGuestBrookEntry() {
  const data = await prisma.GuestBookEntry.findMany({
    select: {
      User: { // Selecting user info (first name and profile image)
        select: {
          firstname: true,
          profileImage: true,
        },
      },
      message: true, // Selecting the message itself
      id: true, // Selecting the entry id
    },
    orderBy: {
      createdAt: "desc", // Ordering entries by creation date (most recent first)
    },
    take: 30, // Limit to the last 30 entries
  });

  return data; // Returning fetched data
}

// Main Guestbook page component
export default function GuestbookPage() {
  return (
    <section className="max-w-7xl w-full px-4 md:px-8 mx-auto"> {/* Container for the page */}
      <h1 className="text-4xl font-semibold lg:text-5xl pt-5">Guestbook</h1> {/* Title of the page */}
      <p className="leading-7 text-muted-foreground mt-2">Sign my Guestbook!</p> {/* Subtitle */}

      <Card className="mt-10"> {/* Card container */}
        <CardHeader className="flex flex-col w-full"> {/* Header of the card */}
          <Label className="mb-1">Message</Label> {/* Label for the input field */}
          
          {/* Suspense to show loading state while waiting for the guestbook form */}
          <Suspense fallback={<GuestbookFormLoading />}>
            <GuestbookForm /> {/* The form component for submitting a message */}
          </Suspense>

          <ul className="pt-7 gap-y-5 flex flex-col"> {/* List of guestbook entries */}
            {/* Suspense for loading guestbook entries */}
            <Suspense fallback={<LoadingMessages />}>
              <GuestBookEntries /> {/* Component to display entries */}
            </Suspense>
          </ul>
        </CardHeader>
      </Card>
    </section>
  );
}

// Component that displays the guestbook entries
async function GuestBookEntries() {
  const data = await getGuestBrookEntry(); // Fetching guestbook entries

  // If there are no entries, return null (nothing to display)
  if (data.length === 0) {
    return null;
  }

  // Mapping through the entries and rendering each one
  return data.map((item) => (
    <li key={item.id}> {/* Each entry is rendered with its unique id */}
      <div className="flex items-center"> {/* Flex container for user info and message */}
        <img
          src="{item.User.profileImage}" // Profile image of the user (needs to be properly interpolated)
          className="w-8 h-8 rounded-lg" // Styling for the image
        ></img>

        <p className="text-muted-foreground pl-3 break-words"> {/* Message text */}
          {item.User?.firstname}: {/* Display user's first name */}
          <span className="text-foreground">{item.message}</span> {/* Display message content */}
        </p>
      </div>
    </li>
  ));
}

// Form component for signed-in users
async function GuestbookForm() {
  const { getUser } = getKindeServerSession(); // Get the current user session
  const user = await getUser(); // Fetching the user from the session

  // If the user is signed in, render the authenticated form
  if (user) {
    return <Form />; // Show the Form component (this will be your form for signed-in users)
  }

  // If the user is not signed in, show the unauthenticated form with a register button
  return (
    <div className="flex justify-between gap-4 flex-col md:flex-row">
      <Input type="text" placeholder="Your Message..." /> {/* Input for message */}
      <RegisterLink>
        <Button>Sign for free</Button> {/* Button to sign up */}
      </RegisterLink>
    </div>
  );
}
