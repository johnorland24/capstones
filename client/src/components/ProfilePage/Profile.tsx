"use client";  
import React, { useState } from "react";  
import {  
  DropdownMenu,  
  DropdownMenuContent,  
  DropdownMenuItem,  
  DropdownMenuLabel,  
  DropdownMenuSeparator,  
  DropdownMenuTrigger,  
} from "@/components/ui/dropdown-menu";  
import {  
  Dialog,  
  DialogContent,  
  DialogDescription,  
  DialogHeader,  
  DialogTitle,  
} from "@/components/ui/dialog";  
import Image from "next/image";  
import { Button } from "../ui/button";  
import { DialogClose } from "@radix-ui/react-dialog";  
import { signOut, useSession } from "next-auth/react";  
import { Label } from "../ui/label";  
import { Input } from "../ui/input";  
import myAxios from "@/lib/axios.config";  
import { LOGOUT_URL, UPDATE_PROFILE } from "@/lib/apiEndPoints";  
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";  
import { toast } from "react-toastify";  
import { getImageUrl } from "@/lib/utils";  
import { BellIcon, UserCog } from "lucide-react";

export default function Profile({ user }: { user: CustomUser }) {  
  const [logoutOpen, setLogOutOpen] = useState(false);  
  const [profileOpen, setProfileOpen] = useState(false);  
  const [image, setImage] = useState<File | null>(null);  
  const [errors, setErrors] = useState({  
    profile_image: [],  
  });  
  const [loading, setLoading] = useState(false);  
  const { update } = useSession();  

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
    const file = event.target.files?.[0];  
    if (file) {  
      setImage(file);  
    }  
  };  

  const logoutUser = async () => {  
    myAxios  
      .post(  
        LOGOUT_URL,  
        {},  
        {  
          headers: {  
            Authorization: `Bearer ${user.token}`,  
          },  
        }  
      )  
      .then(() => {  
        signOut({  
          callbackUrl: "/login",  
          redirect: true,  
        });  
      })  
      .catch(() => {  
        toast.error("Something went wrong. Please try again!");  
      });  
  };  

  const updateProfile = (event: React.FormEvent) => {  
    event.preventDefault();  
    setLoading(true);  
    const formData = new FormData();  
    formData.append("profile_image", image ?? "");  
    myAxios  
      .post(UPDATE_PROFILE, formData, {  
        headers: {  
          Authorization: "Bearer " + user.token,  
        },  
      })  
      .then((res) => {  
        const response = res.data;  
        setLoading(false);  
        update({ profile_image: response.image });  
        toast.success("Profile image updated successfully!");  
        setProfileOpen(false);  
      })  
      .catch((err) => {  
        setLoading(false);  
        if (err.response?.status === 422) {  
          setErrors(err.response?.data?.errors);  
        } else {  
          toast.error("Something went wrong. Please try again!");  
        }  
      });  
  };  

  return (  
    <>  
      {/* Logout dialog */}  
      <Dialog open={logoutOpen} onOpenChange={setLogOutOpen}>  
        <DialogContent className="p-6">  
          <DialogHeader>  
            <DialogTitle className="text-lg font-semibold">Are you sure?</DialogTitle>  
            <DialogDescription>  
              This action will expire your session and you will need to log in again to access your dashboard.  
            </DialogDescription>  
          </DialogHeader>  
          <div className="flex justify-end space-x-4">  
            <Button variant="destructive" onClick={logoutUser}>  
              Yes, Logout!  
            </Button>  
            <DialogClose>  
              <Button variant="outline">Cancel</Button>  
            </DialogClose>  
          </div>  
        </DialogContent>  
      </Dialog>  

      {/* Profile Image update dialog */}  
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>  
        <DialogContent className="p-6">  
          <DialogHeader>  
            <DialogTitle className="text-lg font-semibold">Change Profile Image</DialogTitle>  
          </DialogHeader>  
          <form onSubmit={updateProfile}>  
            <div className="mb-4">  
              <Label htmlFor="profile" className="block mb-1">Profile Image</Label>  
              <Input  
                type="file"  
                onChange={handleImageChange}  
                className="file:text-white"  
                accept="image/png,image/svg,image/jpeg,image/webp,image/jpg,image/gif"  
              />  
              {errors.profile_image?.[0] && (  
                <span className="text-red-500 text-sm">{errors.profile_image[0]}</span>  
              )}  
            </div>  
            <div>  
              <Button className="w-full" disabled={loading}>  
                {loading ? "Processing..." : "Update Profile"}  
              </Button>  
            </div>  
          </form>  
        </DialogContent>  
      </Dialog>  

      <DropdownMenu>  
        <DropdownMenuTrigger asChild>  
          {user.profile_image ? (  
            <Image  
              src={getImageUrl(user.profile_image)}  
              width={40}  
              height={40}  
              alt="Profile"  
              className=" bg-white cursor-pointer rounded-full h-10 w-10 border-separate border-2 border-gray-200   hover:border-blue-600 transition-colors duration-200  "  
            />  
          ) : (  
            <Image  
              src="/avatar.svg"  
              width={40}  
              height={40}  
              alt="Default Avatar"  
              className="bg-white cursor-pointer rounded-full h-10 w-10 border-separate border-2 border-gray-200  hover:border-blue-600 transition-colors duration-200"  
            />  

          )}  
        
        </DropdownMenuTrigger>  
    
        <DropdownMenuContent className="w-48">  
          <DropdownMenuLabel className="font-semibold">My Account</DropdownMenuLabel>  
          <DropdownMenuSeparator />  
          <DropdownMenuItem onClick={() => setProfileOpen(true)}>  
            Edit Profile  
          </DropdownMenuItem>  
          <DropdownMenuItem onClick={() => setLogOutOpen(true)}>  
            Logout  
          </DropdownMenuItem>  
          <DropdownMenuItem >  
          <Button size="icon" variant="secondary" className="rounded-lg">
          <BellIcon className="w-5 h-5" />
         </Button>
          </DropdownMenuItem>  
          <DropdownMenuItem >  
          <Button size="icon" variant="secondary" className="rounded-lg">
          <UserCog/>
          </Button>
          </DropdownMenuItem>  
        </DropdownMenuContent>  
      </DropdownMenu>  
    </>  
  );  
}

<div>
    page
</div>
