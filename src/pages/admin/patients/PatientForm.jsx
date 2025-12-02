import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { PATIENTS } from '@/data/mockData';

const PatientForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        ownerName: '',
        ownerPhone: '',
        ownerEmail: '',
        ownerAddress: '',
        petName: '',
        petSpecies: '',
        petBreed: '',
        petAge: '',
        petWeight: '',
        petColor: ''
    });

    useEffect(() => {
        if (isEditMode) {
            const patient = PATIENTS.find(p => p.id === id);
            if (patient) {
                setFormData({
                    ownerName: patient.owner.name,
                    ownerPhone: patient.owner.phone,
                    ownerEmail: patient.owner.email,
                    ownerAddress: patient.owner.address,
                    petName: patient.name,
                    petSpecies: patient.species,
                    petBreed: patient.breed,
                    petAge: patient.age,
                    petWeight: patient.weight,
                    petColor: patient.color
                });
            }
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Saving patient:', formData);
            // In a real app, we would update the backend here.
            // For prototype, we just navigate back.
            setIsLoading(false);
            navigate('/admin/patients');
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/admin/patients')}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {isEditMode ? 'Editar Paciente' : 'Nuevo Paciente'}
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Owner Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Datos del Dueño</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="ownerName">Nombre Completo *</Label>
                                <Input
                                    id="ownerName"
                                    name="ownerName"
                                    value={formData.ownerName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ownerPhone">Teléfono *</Label>
                                <Input
                                    id="ownerPhone"
                                    name="ownerPhone"
                                    value={formData.ownerPhone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ownerEmail">Email</Label>
                                <Input
                                    id="ownerEmail"
                                    name="ownerEmail"
                                    type="email"
                                    value={formData.ownerEmail}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ownerAddress">Dirección</Label>
                                <Input
                                    id="ownerAddress"
                                    name="ownerAddress"
                                    value={formData.ownerAddress}
                                    onChange={handleChange}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pet Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Datos de la Mascota</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="petName">Nombre *</Label>
                                <Input
                                    id="petName"
                                    name="petName"
                                    value={formData.petName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="petSpecies">Especie *</Label>
                                    <Input
                                        id="petSpecies"
                                        name="petSpecies"
                                        placeholder="Perro, Gato..."
                                        value={formData.petSpecies}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="petBreed">Raza</Label>
                                    <Input
                                        id="petBreed"
                                        name="petBreed"
                                        value={formData.petBreed}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="petAge">Edad (años)</Label>
                                    <Input
                                        id="petAge"
                                        name="petAge"
                                        type="number"
                                        value={formData.petAge}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="petWeight">Peso (kg)</Label>
                                    <Input
                                        id="petWeight"
                                        name="petWeight"
                                        type="number"
                                        step="0.1"
                                        value={formData.petWeight}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="petColor">Color</Label>
                                <Input
                                    id="petColor"
                                    name="petColor"
                                    value={formData.petColor}
                                    onChange={handleChange}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => navigate('/admin/patients')}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        {isEditMode ? 'Guardar Cambios' : 'Registrar Paciente'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PatientForm;
