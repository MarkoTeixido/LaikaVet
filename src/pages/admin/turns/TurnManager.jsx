import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Clock, Calendar as CalendarIcon, Plus, CheckCircle, XCircle } from 'lucide-react';
import { APPOINTMENTS, PATIENTS, USERS } from '@/data/mockData';

const StatusBadge = ({ status }) => {
    const styles = {
        pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500',
        confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500',
        done: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500',
        cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500'
    };

    const labels = {
        pending: 'Pendiente',
        confirmed: 'Confirmado',
        done: 'Realizado',
        cancelled: 'Cancelado'
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles.pending}`}>
            {labels[status] || status}
        </span>
    );
};

const TurnManager = () => {
    const [date, setDate] = useState(new Date());
    const [appointments, setAppointments] = useState(APPOINTMENTS);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newAppointment, setNewAppointment] = useState({
        patientId: '',
        vetId: '',
        time: '',
        type: 'consulta'
    });

    const selectedDateStr = format(date, 'yyyy-MM-dd');
    const dailyAppointments = appointments.filter(a => a.date === selectedDateStr);

    const handleAddAppointment = () => {
        const appointment = {
            id: Date.now().toString(),
            date: selectedDateStr,
            status: 'pending',
            ...newAppointment
        };
        setAppointments([...appointments, appointment]);
        setIsAddDialogOpen(false);
        setNewAppointment({ patientId: '', vetId: '', time: '', type: 'consulta' });
        alert('Turno agendado con éxito. Se ha enviado un correo de confirmación al cliente.');
    };

    const updateStatus = (id, newStatus) => {
        setAppointments(appointments.map(a =>
            a.id === id ? { ...a, status: newStatus } : a
        ));
    };

    const getPatientName = (id) => PATIENTS.find(p => p.id === id)?.name || 'Desconocido';
    const getVetName = (id) => USERS.find(u => u.id === id)?.name || 'Desconocido';

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Gestión de Turnos</h1>
                    <p className="text-muted-foreground">Administra la agenda de la veterinaria.</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="shadow-lg shadow-primary/20">
                            <Plus className="mr-2 h-4 w-4" /> Nuevo Turno
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Agendar Nuevo Turno</DialogTitle>
                            <DialogDescription>
                                Detalles para el turno del día {format(date, 'PPP', { locale: es })}.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="patient" className="text-right">Paciente</Label>
                                <Select
                                    onValueChange={(val) => setNewAppointment({ ...newAppointment, patientId: val })}
                                    value={newAppointment.patientId}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Seleccionar paciente" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PATIENTS.map(p => (
                                            <SelectItem key={p.id} value={p.id}>{p.name} ({p.owner.name})</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="vet" className="text-right">Veterinario</Label>
                                <Select
                                    onValueChange={(val) => setNewAppointment({ ...newAppointment, vetId: val })}
                                    value={newAppointment.vetId}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Seleccionar veterinario" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {USERS.filter(u => u.role === 'veterinarian').map(u => (
                                            <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="time" className="text-right">Hora</Label>
                                <Input
                                    id="time"
                                    type="time"
                                    className="col-span-3"
                                    value={newAppointment.time}
                                    onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="type" className="text-right">Tipo</Label>
                                <Select
                                    onValueChange={(val) => setNewAppointment({ ...newAppointment, type: val })}
                                    value={newAppointment.type}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Tipo de servicio" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="consulta">Consulta General</SelectItem>
                                        <SelectItem value="vacunacion">Vacunación</SelectItem>
                                        <SelectItem value="cirugia">Cirugía</SelectItem>
                                        <SelectItem value="limpieza">Limpieza Dental</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddAppointment}>Agendar Turno</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
                <Card className="lg:col-span-4 h-fit sticky top-8">
                    <CardHeader>
                        <CardTitle>Calendario</CardTitle>
                        <CardDescription>Selecciona una fecha para ver los turnos.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border shadow-sm"
                            locale={es}
                        />
                    </CardContent>
                </Card>

                <Card className="lg:col-span-8">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
                            Turnos para {format(date, 'PPPP', { locale: es })}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {dailyAppointments.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                                <CalendarIcon className="h-12 w-12 opacity-20 mb-4" />
                                <h3 className="text-lg font-semibold">Sin turnos programados</h3>
                                <p className="text-sm max-w-xs mx-auto">No hay citas agendadas para este día. Utiliza el botón "Nuevo Turno" para agregar una.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {dailyAppointments.sort((a, b) => a.time.localeCompare(b.time)).map((appointment) => (
                                    <div key={appointment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-xl bg-card hover:bg-accent/5 transition-colors shadow-sm">
                                        <div className="flex items-start space-x-4 mb-4 sm:mb-0">
                                            <div className="bg-primary/10 p-3 rounded-xl">
                                                <Clock className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold text-foreground">{appointment.time}</p>
                                                    <span className="text-muted-foreground">•</span>
                                                    <p className="font-medium text-foreground">{getPatientName(appointment.patientId)}</p>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm text-muted-foreground mt-1">
                                                    <span>{getVetName(appointment.vetId)}</span>
                                                    <span className="hidden sm:inline">•</span>
                                                    <span className="capitalize px-2 py-0.5 bg-muted rounded-md text-xs font-medium w-fit">{appointment.type}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                                            <StatusBadge status={appointment.status} />

                                            <div className="flex items-center gap-1">
                                                {appointment.status === 'pending' && (
                                                    <>
                                                        <Button variant="ghost" size="icon" onClick={() => updateStatus(appointment.id, 'confirmed')} title="Confirmar" className="text-green-600 hover:text-green-700 hover:bg-green-100 dark:hover:bg-green-900/30">
                                                            <CheckCircle className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" onClick={() => updateStatus(appointment.id, 'cancelled')} title="Cancelar" className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30">
                                                            <XCircle className="h-4 w-4" />
                                                        </Button>
                                                    </>
                                                )}

                                                {appointment.status === 'confirmed' && (
                                                    <Button variant="ghost" size="icon" onClick={() => updateStatus(appointment.id, 'done')} title="Marcar como Realizado" className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                                                        <CheckCircle className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TurnManager;
