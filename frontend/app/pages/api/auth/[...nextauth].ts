import NextAuth, {NextAuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google";
export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ]
}

export default NextAuth(authOptions)

// GoogleProvider({
      
//     clientId: process.env.GOOGLE_ID || '1076546050061-gh9s439cd06d742t8rpjjr094d54497g.apps.googleusercontent.com',
//     clientSecret: process.env.GOOGLE_SECRET || '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',
//     authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code"
//         }
//       }
//   }),