import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Check, CreditCard, Receipt, Calendar } from 'lucide-react';

export default function BillingPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
          Billing
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Manage your subscription and payment methods
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your active subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-6 border rounded-lg bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold">Free Plan</h3>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Perfect for getting started
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">$0</p>
                  <p className="text-sm text-zinc-500">per month</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span>1 project included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span>Basic formatting</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span>Standard AI voices</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button className="w-full">Upgrade Plan</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Manage your payment information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-zinc-400" />
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-zinc-500">Expires 12/25</p>
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Update Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Available Plans</CardTitle>
            <CardDescription>Choose the plan that works for you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold">Starter</p>
                    <p className="text-sm text-zinc-500">$9/month</p>
                  </div>
                </div>
                <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400 mt-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    Up to 5 projects
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    Premium AI voices
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    Priority support
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  Select Plan
                </Button>
              </div>

              <div className="p-4 border-2 border-primary rounded-lg bg-primary/5">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold">Professional</p>
                    <p className="text-sm text-zinc-500">$29/month</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-primary text-white rounded-full">Popular</span>
                </div>
                <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400 mt-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    Unlimited projects
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    Premium AI voices
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    Advanced formatting
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    Priority support
                  </li>
                </ul>
                <Button className="w-full mt-4" size="sm">
                  Select Plan
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold">Enterprise</p>
                    <p className="text-sm text-zinc-500">Custom pricing</p>
                  </div>
                </div>
                <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400 mt-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    Everything in Professional
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    Team collaboration
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    Custom integrations
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    Dedicated support
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  Contact Sales
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>Your recent invoices and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Receipt className="h-5 w-5 text-zinc-400" />
                    <div>
                      <p className="font-medium">Invoice #001</p>
                      <p className="text-sm text-zinc-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        January 15, 2024
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">$0.00</p>
                    <p className="text-xs text-green-600 dark:text-green-400">Paid</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-2">
                  Download Invoice
                </Button>
              </div>
              <p className="text-sm text-zinc-500 text-center">
                No other invoices yet
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

