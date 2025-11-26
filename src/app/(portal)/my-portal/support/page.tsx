"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HeadphonesIcon,
  Search,
  Plus,
  MessageSquare,
  Clock,
  ArrowRight,
  Send,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/portal";
import { mockTickets } from "@/lib/portal-data";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const filteredTickets = mockTickets.filter((ticket) =>
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeTicket = mockTickets.find((t) => t.id === selectedTicket);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // In production, this would send the message to the API
    setNewMessage("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Støtte</h1>
          <p className="text-gray-500 mt-1">Se og administrer dine støttesaker</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Ny sak
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Søk i saker..."
              className="pl-10"
            />
          </div>

          <div className="space-y-2">
            {filteredTickets.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <HeadphonesIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Ingen saker funnet</p>
                </CardContent>
              </Card>
            ) : (
              filteredTickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    selectedTicket === ticket.id && "ring-2 ring-green-500"
                  )}
                  onClick={() => setSelectedTicket(ticket.id)}
                >
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="font-medium text-gray-900 line-clamp-1">{ticket.subject}</p>
                      <StatusBadge statusType={{ type: "ticket", status: ticket.status }} size="sm" />
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-2">{ticket.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>#{ticket.ticketNumber}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(ticket.updatedAt)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Ticket Detail */}
        <div className="lg:col-span-2">
          {!activeTicket ? (
            <Card className="h-full min-h-[400px] flex items-center justify-center">
              <CardContent className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Velg en sak</h3>
                <p className="text-gray-500">Klikk på en sak for å se detaljer</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">{activeTicket.subject}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      #{activeTicket.ticketNumber} • {activeTicket.category}
                    </p>
                  </div>
                  <StatusBadge statusType={{ type: "ticket", status: activeTicket.status }} />
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col py-4">
                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto mb-4 max-h-[400px]">
                  {activeTicket.messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.isStaff ? "justify-start" : "justify-end"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg p-3",
                          message.isStaff
                            ? "bg-gray-100 text-gray-900"
                            : "bg-green-600 text-white"
                        )}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={cn(
                            "text-xs mt-1",
                            message.isStaff ? "text-gray-500" : "text-green-100"
                          )}
                        >
                          {message.isStaff ? "Support" : "Du"} • {formatDate(message.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Form */}
                {activeTicket.status !== "CLOSED" && (
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Skriv en melding..."
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <Card className="bg-gray-50">
        <CardContent className="py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="font-medium text-gray-900">Trenger du raskere hjelp?</h3>
              <p className="text-sm text-gray-500">
                Ring oss på +47 22 00 00 00 eller send e-post til support@nornex.no
              </p>
            </div>
            <Link href="/om-oss#kontakt">
              <Button variant="outline">
                Kontakt oss
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
