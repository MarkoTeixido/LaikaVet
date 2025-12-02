import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Plus, Search, FileText, Calendar, User, Stethoscope } from 'lucide-react';
import { PATIENTS, USERS } from '@/data/mockData';

const MedicalHistory = () => {
    const [selectedPatientId, setSelectedPatientId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newEntry, setNewEntry] = useState({
        reason: '',
        diagnosis: '',
        treatment: '',
        observations: ''
    });

    // Filter patients for search
    const filteredPatients = PATIENTS.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.owner.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedPatient = PATIENTS.find(p => p.id === selectedPatientId);

    const handleAddEntry = () => {
        if (!selectedPatient) return;

        const entry = {
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
            vetId: '2', // Mock logged in vet
            ...newEntry
        };

        // In a real app, we would update the backend. 
        // Here we just simulate adding to the local object for display (won't persist reload)
        selectedPatient.history.unshift(entry);

        setIsAddDialogOpen(false);
        setNewEntry({ reason: '', diagnosis: '', treatment: '', observations: '' });
    };

    const getVetName = (id) => USERS.find(u => u.id === id)?.name || 'Veterinario';

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Historia Clínica</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-12">
                {/* Patient Selection Sidebar */}
                <Card className="md:col-span-4 lg:col-span-3 h-[calc(100vh-200px)] flex flex-col">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Pacientes</CardTitle>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-0">
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            {filteredPatients.map(patient => (
                                <button
                                    key={patient.id}
                                    onClick={() => setSelectedPatientId(patient.id)}
                                    className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${selectedPatientId === patient.id ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600' : ''
                                        }`}
                                >
                                    <div className="font-medium text-gray-900 dark:text-white">{patient.name}</div>
                                    <div className="text-sm text-gray-500">{patient.species} - {patient.owner.name}</div>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* History Content */}
                <Card className="md:col-span-8 lg:col-span-9 h-[calc(100vh-200px)] flex flex-col">
                    {selectedPatient ? (
                        <>
                            <CardHeader className="border-b flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl">{selectedPatient.name}</CardTitle>
                                    <CardDescription>
                                        {selectedPatient.species} {selectedPatient.breed} • {selectedPatient.age} años • {selectedPatient.weight} kg
                                    </CardDescription>
                                </div>
                                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" /> Nueva Consulta
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px]">
                                        <DialogHeader>
                                            <DialogTitle>Registrar Consulta</DialogTitle>
                                            <DialogDescription>
                                                Ingrese los detalles de la consulta para {selectedPatient.name}.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="reason">Motivo de Consulta</Label>
                                                <Input
                                                    id="reason"
                                                    value={newEntry.reason}
                                                    onChange={(e) => setNewEntry({ ...newEntry, reason: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="diagnosis">Diagnóstico</Label>
                                                <Textarea
                                                    id="diagnosis"
                                                    value={newEntry.diagnosis}
                                                    onChange={(e) => setNewEntry({ ...newEntry, diagnosis: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="treatment">Tratamiento</Label>
                                                <Textarea
                                                    id="treatment"
                                                    value={newEntry.treatment}
                                                    onChange={(e) => setNewEntry({ ...newEntry, treatment: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="observations">Observaciones</Label>
                                                <Textarea
                                                    id="observations"
                                                    value={newEntry.observations}
                                                    onChange={(e) => setNewEntry({ ...newEntry, observations: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" onClick={handleAddEntry}>Guardar Registro</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </CardHeader>
                            <CardContent className="flex-1 overflow-y-auto p-6">
                                {selectedPatient.history.length === 0 ? (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <FileText className="mx-auto h-12 w-12 opacity-20" />
                                        <p className="mt-2">No hay registros médicos para este paciente.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                                        {selectedPatient.history.map((entry) => (
                                            <div key={entry.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-500 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                                    <Stethoscope className="w-5 h-5" />
                                                </div>
                                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-gray-800 p-4 rounded border border-slate-200 dark:border-gray-700 shadow">
                                                    <div className="flex items-center justify-between space-x-2 mb-1">
                                                        <div className="font-bold text-slate-900 dark:text-white">{entry.reason}</div>
                                                        <time className="font-caveat font-medium text-blue-500">{entry.date}</time>
                                                    </div>
                                                    <div className="text-slate-500 dark:text-gray-400 text-sm mb-2">
                                                        Dr. {getVetName(entry.vetId)}
                                                    </div>
                                                    <div className="space-y-2 text-sm">
                                                        <div><span className="font-semibold">Diagnóstico:</span> {entry.diagnosis}</div>
                                                        <div><span className="font-semibold">Tratamiento:</span> {entry.treatment}</div>
                                                        {entry.observations && (
                                                            <div className="text-gray-500 italic">"{entry.observations}"</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                            <User className="h-16 w-16 opacity-20 mb-4" />
                            <p className="text-lg">Seleccione un paciente para ver su historia clínica</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default MedicalHistory;
