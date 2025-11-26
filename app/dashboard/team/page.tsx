import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, Mail, Crown, Shield, User } from 'lucide-react';

export default function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: 'You',
      email: 'you@example.com',
      role: 'Owner',
      avatar: 'Y',
      status: 'active',
    },
  ];

  const pendingInvites = [
    {
      id: 1,
      email: 'editor@example.com',
      role: 'Editor',
      invitedBy: 'You',
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
            Team
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Collaborate with editors, designers, and co-authors
          </p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            People who have access to your projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">{member.avatar}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{member.name}</p>
                      {member.role === 'Owner' && (
                        <Crown className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      )}
                    </div>
                    <p className="text-sm text-zinc-500">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 rounded-full">
                    {member.role}
                  </span>
                  {member.role !== 'Owner' && (
                    <Button variant="ghost" size="sm">
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {pendingInvites.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pending Invitations</CardTitle>
            <CardDescription>
              Invitations waiting for acceptance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingInvites.map((invite) => (
                <div
                  key={invite.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-zinc-400" />
                    </div>
                    <div>
                      <p className="font-medium">{invite.email}</p>
                      <p className="text-sm text-zinc-500">
                        Invited by {invite.invitedBy} • {invite.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Resend
                    </Button>
                    <Button variant="ghost" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Roles & Permissions</CardTitle>
            <CardDescription>
              Understand what each role can do
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  <p className="font-medium">Owner</p>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Full access to all projects, billing, and team management
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <p className="font-medium">Editor</p>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Can edit and manage assigned projects, but cannot delete or change billing
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                  <p className="font-medium">Viewer</p>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Can view and comment on projects, but cannot make changes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Collaboration Features</CardTitle>
            <CardDescription>
              Work together seamlessly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                <div>
                  <p className="font-medium">Real-time collaboration</p>
                  <p className="text-zinc-500">Multiple team members can work on projects simultaneously</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                <div>
                  <p className="font-medium">Project sharing</p>
                  <p className="text-zinc-500">Share specific projects with team members without full account access</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                <div>
                  <p className="font-medium">Comment system</p>
                  <p className="text-zinc-500">Leave feedback and suggestions directly on manuscripts</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                <div>
                  <p className="font-medium">Activity tracking</p>
                  <p className="text-zinc-500">See who made what changes and when</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

