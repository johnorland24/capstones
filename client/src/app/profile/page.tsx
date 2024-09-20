import PostCard from '@/components/post/PostCard'
import ProfileInfo from '@/components/post/ProfileInfo';
import React, { useState } from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import { getPosts } from '@/dataFetch/postFetch';




export default async function page(  ) {
  const session = (await getServerSession(authOptions)) as CustomSession;
  const posts: APIResponseType<PostApiType> = await getPosts(
    session.user?.token!
  );

  return (
    <div>
    <ProfileInfo data={posts} user={session.user!}/>
    </div>
  )
}
